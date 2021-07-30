import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { timeout } from "rxjs/operators";
import { AppGateway } from "src/app.gateway";
import { AuthService } from "src/auth/auth.service";
import { Public } from "src/common/decorators/public.decorator";
import { Roles } from "src/common/decorators/role.decorator";
import { Role } from "src/common/enums/role.enum";
import { storage } from "src/configs/storage.config";
import { CreatePartnerDTO } from "src/services/partners/dtos/create-partner.dto";
import { RegisterPartnerDTO } from "src/services/partners/dtos/register-partner.dto";
import { CreateUserDTO } from "src/services/users/dtos/create-user.dto";
import { UsersService } from "src/services/users/users.service";
import { EmailService } from "src/utils/email/email.service";
import { AddClassDTO } from "./dtos/add-class.dto";
import { AddPolicyDTO } from "./dtos/add-policy.dto";
import { EditPolicyDTO } from "./dtos/edit-policy.dto";
import { GetPolicyByConditionsDTO } from "./dtos/get-policy-by-conditions.dto";

@Controller("partners")
export class PartnersController {
  private readonly logger = new Logger("PartnerController");

  constructor(
    @Inject("PARTNER_SERVICE") private readonly client: ClientProxy,
    private readonly appGateway: AppGateway,
    private usersService: UsersService,
    private emailService: EmailService,
    private authService: AuthService
  ) {}

  async createPresenter(createPartnerDTO: CreatePartnerDTO) {
    try {
      const presenter: CreateUserDTO = {
        email: createPartnerDTO.email,
        password: createPartnerDTO.password,
        firstName: createPartnerDTO.presenterFirstName,
        lastName: createPartnerDTO.presenterLastName,
        phoneNumber: createPartnerDTO.presenterPhoneNumber,
        role: Role.partner,
      };
      const presenterId = await this.usersService.createUser(presenter);
      return presenterId;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createPartner(
    createPartnerDTO: CreatePartnerDTO,
    presenterId: string,
    logoUrl: string
  ) {
    const partner: RegisterPartnerDTO = {
      logoUrl,
      presenterId,
      companyName: createPartnerDTO.companyName,
      companyEmail: createPartnerDTO.companyEmail,
      transportType: createPartnerDTO.transportType,
      companyHotline: createPartnerDTO.companyHotline,
    };
    await this.client
      .send("register_partner", partner)
      .pipe(timeout(15000))
      .toPromise();
  }

  @Roles(Role.partner)
  @Get()
  async getPartnerByPresenter(@Query("presenterId") presenterId: string) {
    try {
      const partner = await this.client
        .send("get_partner_by_presenter", presenterId)
        .pipe(timeout(15000))
        .toPromise();
      return partner;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor("logo", { storage }))
  async postPartner(
    @Body() createPartnerDTO: CreatePartnerDTO,
    @UploadedFile() logo: Express.Multer.File,
    @Req() request: Request
  ) {
    try {
      const presenterId = await this.createPresenter(createPartnerDTO);
      await this.createPartner(
        createPartnerDTO,
        presenterId,
        `http://${request.headers.host}/${logo.filename}`
      );
      const token = await this.authService.generateTokenForVerify(presenterId);
      // this.emailService.sendRegistrationMail(
      //   createPartnerDTO.email,
      //   createPartnerDTO.presenterFirstName,
      //   createPartnerDTO.presenterLastName,
      //   request.headers.host,
      //   token
      // );
      return {
        message:
          "Register partner successfully! " +
          "A verification link has been sent to your email, " +
          "please click that link it to activate your account. " +
          "You will be contacted by us soon!",
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.admin)
  @Get("admin")
  async getAllInactivePartners() {
    try {
      const partners = await this.client
        .send("get_all_inactive_partners", "")
        .pipe(timeout(15000))
        .toPromise();
      const partnersWithPresenters = await Promise.all(
        partners.map(async (partner) => {
          const { presenterId, ...rest } = partner;
          const presenter = await this.usersService.getUserByID(
            partner.presenterId
          );
          const { email, firstName, lastName, phoneNumber } = presenter;
          return {
            ...rest,
            presenter: { email, firstName, lastName, phoneNumber },
          };
        })
      );
      return { partners: partnersWithPresenters };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Post("classes")
  async postClasses(@Body() addClassesDTO: AddClassDTO) {
    try {
      const [vehicleClass, result] = await this.client
        .send("add_classes", addClassesDTO)
        .pipe(timeout(15000))
        .toPromise();
      if (result === 1)
        throw new HttpException(
          "Class name already exists",
          HttpStatus.BAD_REQUEST
        );
      return { vehicleClass: vehicleClass[0] };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Roles(Role.partner)
  @Get("policies")
  async getPoliciesByPartnerAndType(
    @Query("policyTypes") policyTypes: string[],
    @Query("partnerId") partnerId: string
  ) {
    try {
      const policies = await this.client
        .send("get_policies_by_partner_and_type", { policyTypes, partnerId })
        .pipe(timeout(15000))
        .toPromise();
      return policies;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.guest)
  @Get("policies/fullSearch")
  async getPolicyByConditions(
    @Query() getPolicyByConditions: GetPolicyByConditionsDTO
  ) {
    try {
      const policy = await this.client
        .send("get_policy_by_conditions", getPolicyByConditions)
        .pipe(timeout(15000))
        .toPromise();
      return policy;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Post("policies")
  async postPolicy(@Body() data: { policy: AddPolicyDTO; policyType: string }) {
    try {
      const policy = await this.client
        .send("add_policy", data)
        .pipe(timeout(15000))
        .toPromise();
      return policy;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Public()
  @Get("emails/:email")
  async getPartnerByEmail(@Param("email") email: string) {
    try {
      const partner = await this.client
        .send("get_partner_by_email", email)
        .pipe(timeout(15000))
        .toPromise();
      return { doesExist: !!partner };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Public()
  @Get("names/:name")
  async getPartnerByName(@Param("name") name: string) {
    try {
      const partner = await this.client
        .send("get_partner_by_name", name)
        .pipe(timeout(15000))
        .toPromise();
      return { doesExist: !!partner };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Public()
  @Get("hotlines/:hotline")
  async getPartnerByHotline(@Param("hotline") hotline: string) {
    try {
      const partner = await this.client
        .send("get_partner_by_hotline", hotline)
        .pipe(timeout(15000))
        .toPromise();
      return { doesExist: !!partner };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Patch("policies/:policyId")
  async patchPolicy(@Param("policyId") policyId: string, @Body() policy: any) {
    const editPolicy = new EditPolicyDTO(
      policy.condition,
      policy.lostPercentage,
      policy.vehicleClass,
      policyId
    );
    try {
      const policy = await this.client
        .send("edit_policy", editPolicy)
        .pipe(timeout(15000))
        .toPromise();
      return policy;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Delete("policies/:policyId")
  async deletePolicy(@Param("policyId") policyId: string) {
    try {
      const policy = await this.client
        .send("remove_policy", policyId)
        .pipe(timeout(15000))
        .toPromise();
      return policy;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Patch("classes/:classId")
  async patchClass(
    @Param("classId") classId,
    @Body("name") name: string,
    @Body("partnerId") partnerId: string
  ) {
    try {
      const [vehicleClass, result] = await this.client
        .send("edit_class", { classId, name, partnerId })
        .pipe(timeout(15000))
        .toPromise();
      if (result === 1)
        throw new HttpException(
          "Class name already exists",
          HttpStatus.BAD_REQUEST
        );
      return { vehicleClass: vehicleClass[0] };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Roles(Role.partner)
  @Delete("classes/:classId")
  async deleteClass(@Param("classId") classId: string) {
    try {
      const vehicleClass = await this.client
        .send("remove_class", classId)
        .pipe(timeout(15000))
        .toPromise();
      return vehicleClass;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.admin)
  @Patch(":partnerId/activate")
  async activatePartner(@Param("partnerId") partnerId: string) {
    try {
      const isSuccess = await this.client
        .send("activate_partner", partnerId)
        .pipe(timeout(15000))
        .toPromise();
      if (!isSuccess) return { message: "Cannot activate partner!" };
      this.appGateway.announceToPartner(partnerId);
      return { message: "Activate partner successfully!" };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Patch(":partnerId/logo")
  @UseInterceptors(FileInterceptor("logo", { storage }))
  async changePartnerLogo(
    @Param("partnerId") partnerId: string,
    @Body() data: { oldLogoKey: string },
    @UploadedFile() logo: Express.Multer.File,
    @Req() request: Request
  ) {
    try {
      const logoUrl = `http://${request.headers.host}/${logo.filename}`;
      const changes = await this.client
        .send("change_partner_logo", { logoUrl, partnerId })
        .pipe(timeout(15000))
        .toPromise();
      return changes;
    } catch (error) {}
  }
}
