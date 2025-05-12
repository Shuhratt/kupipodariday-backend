import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/typeorm.config';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'env/.env' });

const configService = new ConfigService();
const typeOrmConfig = getTypeOrmConfig<DataSourceOptions>(configService);

export const AppDataSource = new DataSource(typeOrmConfig);
