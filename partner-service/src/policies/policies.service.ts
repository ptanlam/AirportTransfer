import { Injectable, Logger, Query } from '@nestjs/common';
import { DatabaseError } from 'sequelize';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize';
import { EditPolicyDTO } from 'src/dtos/edit-policy.dto';
import { GetPolicyByConditionsDTO } from 'src/dtos/get-policy-by-conditions.dto';
import { Policy } from 'src/models/policy.model';

@Injectable()
export class PoliciesService {
  private readonly logger = new Logger('PoliciesService');

  constructor(private sequelize: Sequelize) {}

  async addPolicy(
    type: string,
    classId: string,
    condition: string,
    lostPercentage: number,
  ): Promise<Policy> {
    try {
      const policy = await this.sequelize.query(
        'SP_AddPolicy @type=:type, @condition=:condition, ' +
          '@lostPercentage=:lostPercentage, @classId=:classId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            type,
            condition,
            lostPercentage,
            classId,
          },
          raw: true,
          mapToModel: true,
          model: Policy,
        },
      );
      return policy[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async editPolicy(editPolicyDTO: EditPolicyDTO) {
    try {
      const policy = await this.sequelize.query(
        'SP_EditPolicy @policyId=:policyId, @condition=:condition, ' +
          '@lostPercentage=:lostPercentage, @classId=:classId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            policyId: editPolicyDTO.policyId,
            condition: editPolicyDTO.condition,
            lostPercentage: editPolicyDTO.lostPercentage,
            classId: editPolicyDTO.vehicleClass?.id || null,
          },
        },
      );
      return policy[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async removePolicy(policyId: string) {
    try {
      const policy = await this.sequelize.query(
        'SP_RemovePolicy @policyId=:policyId',
        {
          type: QueryTypes.DELETE,
          replacements: { policyId },
        },
      );
      return policy[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getPolicyByConditions(
    getPolicyByConditionsDTO: GetPolicyByConditionsDTO,
  ): Promise<Policy | {}> {
    try {
      const purchaseDate = new Date(getPolicyByConditionsDTO.purchaseDate);
      const policy = await this.sequelize.query(
        'SP_GetPolicyByConditions @purchaseDate=:purchaseDate, ' +
          '@departureAt=:departureAt, @classId=:classId, ' +
          '@policyType=:policyType, @cancellationDate=:cancellationDate',
        {
          type: QueryTypes.SELECT,
          replacements: {
            purchaseDate: new Date(
              purchaseDate.getTime() + purchaseDate.getTimezoneOffset() * 60000,
            ),
            departureAt: getPolicyByConditionsDTO.departureAt,
            classId: getPolicyByConditionsDTO.classId,
            policyType: getPolicyByConditionsDTO.policyType,
            cancellationDate: new Date(),
          },
          raw: true,
          mapToModel: true,
          model: Policy,
        },
      );
      return policy[0] || {};
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
