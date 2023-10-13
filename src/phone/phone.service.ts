import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Phone from './interface/phone.interface';
import UpdatePhoneDto from './dto/updatePhone.dto';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import PhoneEntity from './entities/phone.entity';
import { Repository } from 'typeorm';
 
@Injectable()
export default class PhonesService {
  constructor(
    @InjectRepository(PhoneEntity)
    private phonesRepository: Repository<PhoneEntity>
  ) {}
 
  async getAllPhones() {
    const phones = await this.phonesRepository.find();
    return phones.sort((a, b) => a.price - b.price);
  }
 
  async getPhoneById(id: string) {
    const phone = await this.phonesRepository.findOne({where: {id}});
    if (phone) {
      return phone;
    }
    throw new HttpException('Phone not found', HttpStatus.NOT_FOUND);
  }
 
  async createPhone(phone: Phone) {
    const newPhone = await this.phonesRepository.create({
      id: uuidv4(),
      date_added: format (new Date(), 'yyyy-MM-dd HH:mm:ss'),
      ...phone
    }); 
   
    await this.phonesRepository.save(newPhone);
    return newPhone;
  }
 
  async deletePhone(id: string) {
    const deletePhone = await this.phonesRepository.delete(id);
    if(!deletePhone) {
      throw new HttpException('Phone not found', HttpStatus.NOT_FOUND);
    }
  }

  async updatePhone(id: string, phone: UpdatePhoneDto) {
    await this.phonesRepository.update(id, phone);
    const updatePhone = await this.phonesRepository.findOne({where: {id}});
    if(updatePhone) {
      return updatePhone;
    }
    throw new HttpException('Phone not found', HttpStatus.NOT_FOUND);
  }
}