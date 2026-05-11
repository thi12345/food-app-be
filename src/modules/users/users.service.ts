import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { hashPasswordHelper } from '@/helpers/util';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  isEmailExist = async(email: string )=>{
      const user = await this.userRepository.exists({ where: { email } });
    return !!user;
  }
  async create(createUserDto: CreateUserDto) {
    const {name,email,password,phone,address,image} = createUserDto;
    //check mail exist or not
    const isEmailExist = await this.isEmailExist(email);
    if(isEmailExist){
      throw new BadRequestException('Email already exists');
    }
    //hash password 
    const hashPassword = await hashPasswordHelper(createUserDto.password);
    const user= await this.userRepository.create({
      name,email,password: hashPassword ,phone,address,image
    })
    await this.userRepository.save(user);
    return {
      _id: user.id
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const {filter,sort} = aqp(query);
    if(filter.current) delete filter.current;
    if(filter.pageSize) delete filter.pageSize;
    
    if(!current) current = 1;
    if(!pageSize) pageSize = 10;

    const totalItems = (await this.userRepository.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * pageSize;

    const result = await this.userRepository.find({
      where: filter,
      take: pageSize,
      skip: skip,
      order: sort as any});
    
    return {result, totalPages};
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({id: updateUserDto.id}, {...updateUserDto});
  }
  async findOneByEmailOrPhoneNumber(params: string){
    const value = params.trim().toLowerCase();
    const isEmail = value.includes('@');
    return await this.userRepository.findOne({where: isEmail ? {email: value} : {phone: value}});
  }
  remove(id: string) {
try{
      return this.userRepository.delete({id});
}
catch(error){
  throw new BadRequestException('Delete user failed');
}

  }
}
