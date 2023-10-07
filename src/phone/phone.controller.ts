import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import PhoneService from './phone.service';
import CreatePhoneDto from './dto/createPhone.dto';
import UpdatePhoneDto from './dto/updatePhone.dto';
 
@Controller('phone')
export default class PhonesController {
  constructor(
    private readonly phoneService: PhoneService
  ) {}
 
  @Get()
  getAllPhone() {
    return this.phoneService.getAllPhones();
  }
 
  @Get(':id')
  getPhoneById(@Param('id') id: string) {
    return this.phoneService.getPhoneById(Number(id));
  }
 
  @Post()
  async createPhone(@Body() phone: CreatePhoneDto) {
    return this.phoneService.createPhone(phone);
  }
 
  @Put(':id')
  async replacePhone(@Param('id') id: string, @Body() phone: UpdatePhoneDto) {
    return this.phoneService.replacePhone(Number(id), phone);
  }
 
  @Delete(':id')
  async deletePhone(@Param('id') id: string) {
    this.phoneService.deletePhone(Number(id));
  }
}