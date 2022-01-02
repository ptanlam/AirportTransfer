import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError } from 'sequelize';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize';
import { Class } from 'src/models/class.model';

@Injectable()
export class ClassesService {
  private readonly logger = new Logger('ClassesService');

  constructor(private sequelize: Sequelize) {}

  async getClassById(id: string): Promise<Class> {
    try {
      const vehicleClass = await this.sequelize.query(
        'SP_GetClassById @id=:id',
        {
          type: QueryTypes.SELECT,
          replacements: { id },
          raw: true,
          mapToModel: true,
          model: Class,
        },
      );
      return vehicleClass[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getClassByPartnerAndName(partnerId: string, className: string) {
    try {
      const vehicleClass = await this.sequelize.query(
        'SP_GetClassByPartnerAndName @partnerId=:partnerId, @className=:className',
        {
          type: QueryTypes.SELECT,
          replacements: { partnerId, className },
          raw: true,
          mapToModel: true,
          model: Class,
        },
      );
      return vehicleClass[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async addClass(name: string, partnerId: string): Promise<[number, number]> {
    try {
      const result = await this.sequelize.query(
        'SP_AddClass @name=:name, @partnerId=:partnerId',
        {
          type: QueryTypes.INSERT,
          replacements: { name, partnerId },
        },
      );
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async editClass(
    name: string,
    classId: string,
    partnerId: string,
  ): Promise<[Class[], number]> {
    try {
      const result = await this.sequelize.query(
        'SP_EditClass @name=:name, @classId=:classId, @partnerId=:partnerId',
        {
          type: QueryTypes.UPDATE,
          replacements: { name, classId, partnerId },
        },
      );
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async removeClass(classId: string): Promise<Class> {
    try {
      const vehicleClass = await this.sequelize.query(
        'SP_RemoveClass @classId=:classId',
        {
          type: QueryTypes.SELECT,
          replacements: { classId },
          raw: true,
          mapToModel: true,
          model: Class,
        },
      );
      return vehicleClass[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
