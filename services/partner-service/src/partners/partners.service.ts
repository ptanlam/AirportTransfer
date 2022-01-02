import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError } from 'sequelize';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize';
import { RegisterPartnerDTO } from 'src/dtos/register-partner.dto';
import { Class } from 'src/models/class.model';
import { Policy } from 'src/models/policy.model';
import { Partner } from '../models/partner.model';

@Injectable()
export class PartnersService {
  private readonly logger = new Logger('PartnersService');

  constructor(private sequelize: Sequelize) {}

  async registerPartner(
    registerPartnerDTO: RegisterPartnerDTO,
  ): Promise<Partner> {
    try {
      const partner = await this.sequelize.query(
        'SP_RegisterPartner @name=:name, @hotline=:hotline, ' +
          '@email=:email, @transportType=:transportType, ' +
          '@logoUrl=:logoUrl, @presenterId=:presenterId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name: registerPartnerDTO.companyName,
            hotline: registerPartnerDTO.companyHotline,
            email: registerPartnerDTO.companyEmail,
            transportType: registerPartnerDTO.transportType,
            logoUrl: registerPartnerDTO.logoUrl,
            presenterId: registerPartnerDTO.presenterId,
          },
          raw: true,
          mapToModel: true,
          model: Partner,
        },
      );
      return partner[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getAllInactivePartners(): Promise<Partner[]> {
    try {
      const partners = await this.sequelize.query('SP_GetAllInactivePartners', {
        type: QueryTypes.SELECT,
        raw: true,
        mapToModel: true,
        model: Partner,
      });
      return partners;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getPartnerByPresenter(presenterId: string): Promise<Partner> {
    try {
      const jsonRecord = await this.sequelize.query(
        'SP_GetPartnerByPresenter @presenterId=:presenterId',
        {
          type: QueryTypes.RAW,
          replacements: { presenterId },
        },
      );
      const partner = JSON.parse(
        Object.values(jsonRecord[0])
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr, ''),
      );
      return partner;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getPartnerById(partnerId: string): Promise<Partner> {
    try {
      const partner = await this.sequelize.query(
        'SP_GetPartnerById @partnerId=:partnerId',
        {
          type: QueryTypes.SELECT,
          replacements: { partnerId },
          raw: true,
          mapToModel: true,
          model: Partner,
        },
      );
      return partner[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getPartnerByName(name: string): Promise<Partner> {
    try {
      const partner = await this.sequelize.query(
        'SP_GetPartnerByName @name=:name',
        {
          type: QueryTypes.SELECT,
          replacements: { name },
          raw: true,
          mapToModel: true,
          model: Partner,
        },
      );
      return partner[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getPartnerByEmail(email: string): Promise<Partner> {
    try {
      const partner = await this.sequelize.query(
        'SP_GetPartnerByEmail @email=:email',
        {
          type: QueryTypes.SELECT,
          replacements: { email },
          raw: true,
          mapToModel: true,
          model: Partner,
        },
      );
      return partner[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getPartnerByHotline(hotline: string) {
    try {
      const partner = await this.sequelize.query(
        'SP_GetPartnerByHotline @hotline=:hotline',
        {
          type: QueryTypes.SELECT,
          replacements: { hotline },
          raw: true,
          mapToModel: true,
          model: Partner,
        },
      );
      return partner[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async changePartnerLogo(
    partnerId: string,
    logoUrl: string,
  ): Promise<Partner> {
    try {
      const partner = await this.sequelize.query(
        'SP_ChangePartnerLogo @partnerId=:partnerId, @logoUrl=:logoUrl',
        {
          type: QueryTypes.SELECT,
          replacements: { partnerId, logoUrl },
          raw: true,
          mapToModel: true,
          model: Partner,
        },
      );
      return partner[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async activatePartner(partnerId: string): Promise<boolean> {
    try {
      const result = await this.sequelize.query(
        'SP_ActivatePartner @partnerId=:partnerId',
        {
          type: QueryTypes.UPDATE,
          replacements: { partnerId },
        },
      );
      return !!result[1];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
