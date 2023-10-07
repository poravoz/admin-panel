import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Phone from './interface/phone.interface';
import UpdatePhoneDto from './dto/updatePhone.dto';
import { v4 as uuidv4 } from 'uuid';
 
@Injectable()
export default class PhonesService {
  private phones: Phone[] = [];
 
  getAllPhones() {
    return this.phones.slice().sort((a, b) => a.price - b.price);
  }
 
  getPhoneById(id: string) {
    const phone = this.phones.find(phone => phone.id === id);
    if (phone) {
      return phone;
    }
    throw new HttpException('Phone not found', HttpStatus.NOT_FOUND);
  }
 
  createPhone(phone: Phone) {
    const newPhone = {
      id: uuidv4(),
      ...phone
    }
    this.phones.push(newPhone);
    return newPhone;
  }
 
  deletePhone(id: string) {
    const phoneIndex = this.phones.findIndex(phone => phone.id === id);
    if (phoneIndex > -1) {
      this.phones.splice(phoneIndex, 1);
    } else {
      throw new HttpException('Phone not found', HttpStatus.NOT_FOUND);
    }
  }

  updatePhone(id: string, phone: UpdatePhoneDto) {
    const phoneIndex = this.phones.findIndex(p => p.id === id);
    if (phoneIndex > -1) {
      this.phones[phoneIndex] = { ...this.phones[phoneIndex], ...phone };
      return this.phones[phoneIndex];
    }
    throw new HttpException('Phone not found', HttpStatus.NOT_FOUND);
  }
}