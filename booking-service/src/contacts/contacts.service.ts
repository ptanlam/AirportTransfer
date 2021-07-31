import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError, QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize';
import { Contact } from '../models/contact.model';
import { CreateContactDto } from '../dtos/create-contact.dto';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger('ContactService');
  constructor(private sequelize: Sequelize) {}

  async postContact(createContactDto: CreateContactDto) {
    try {
      const contact = await this.sequelize.query(
        `SP_CreateContact @contactFullName=:contactFullName, @phoneNumber=:phoneNumber, @email=:email`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            contactFullName: createContactDto.contactFullName,
            phoneNumber: createContactDto.phoneNumber,
            email: createContactDto.email,
          },
          mapToModel: true,
          model: Contact,
          raw: true,
        },
      );
      return contact[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getContacts() {
    try {
      const contacts = await this.sequelize.query('SP_GetContacts', {
        type: QueryTypes.SELECT,
        mapToModel: true,
        model: Contact,
        raw: true,
      });
      return contacts;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getContact(id: string) {
    try {
      const contacts = await this.sequelize.query('SP_GetContact @id=:id', {
        replacements: { id },
        type: QueryTypes.SELECT,
        mapToModel: true,
        model: Contact,
        raw: true,
      });
      return contacts;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
