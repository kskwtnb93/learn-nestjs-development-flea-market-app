import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;
    const salt = await bcrypt.genSalt(); // salt: ハッシュ値の強度を高めるための文字列。ハッシュ値の復元を難しくする。
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashPassword, status });

    await this.save(user);
    return user;
  }
}
