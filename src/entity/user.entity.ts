import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from 'typeorm';
import bcrypt from 'bcrypt';
import Stock from './stock.entity';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  balance: number;

  @ManyToMany(() => Stock)
  @JoinTable()
  stocks: Stock[];

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
      name: this.name,
      balance: this.balance,
      stocks: this.stocks,
    };
    return userDTO;
  }
}

export default User;
