import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";

  
  import { Length, IsNotEmpty,IsEmail } from "class-validator";
  import * as bcrypt from "bcryptjs";
  
  @Entity()
  @Unique(["username"])
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 40)
    @IsNotEmpty()
    @IsEmail()
    username: string;
  
    @Column()
    @IsNotEmpty()
    password: string;
  
    @Column()
    @IsNotEmpty()
    role: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
    hashPassword():void {
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
    }
  
    checkPassword(unencryptedPassword: string):boolean {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
  }