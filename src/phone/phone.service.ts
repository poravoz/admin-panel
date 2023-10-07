import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Phone from './interface/phone.interface';
import UpdatePhoneDto from './dto/updatePhone.dto';
 
@Injectable()
export default class PhonesService {
  private lastPhoneId = 0;
  private phones: Phone[] = [];
 
  getAllPhones() {
    return this.phones;
  }
 
  getPhoneById(id: number) {
    const phone = this.phones.find(phone => phone.id === id);
    if (phone) {
      return phone;
    }
    throw new HttpException('Phone not found', HttpStatus.NOT_FOUND);
  }
 
  createPhone(phone: Phone) {
    const newPhone = {
      id: ++this.lastPhoneId,
      ...phone
    }
    this.phones.push(newPhone);
    return newPhone;
  }
 
  deletePhone(id: number) {
    const phoneIndex = this.phones.findIndex(phone => phone.id === id);
    if (phoneIndex > -1) {
      this.phones.splice(phoneIndex, 1);
    } else {
      throw new HttpException('Phone not found', HttpStatus.NOT_FOUND);
    }
  }

  updatePhone(id: number, phone: UpdatePhoneDto) {
    const phoneIndex = this.phones.findIndex(p => p.id === id);
    if (phoneIndex > -1) {
      this.phones[phoneIndex] = { ...this.phones[phoneIndex], ...phone };
      return this.phones[phoneIndex];
    }
    throw new HttpException('Phone not found', HttpStatus.NOT_FOUND);
  }
}