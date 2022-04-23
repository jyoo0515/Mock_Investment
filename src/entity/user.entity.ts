import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  static async checkUnique(username: string): Promise<boolean> {
    try {
      await User.findOneByOrFail({ username: username });
      return false;
    } catch (err) {
      return true;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  destruct() {
    const userDTO = {
      id: this.id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
    };
    return userDTO;
  }
}

export default User;
