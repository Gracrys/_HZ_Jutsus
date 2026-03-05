import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

export interface IJutsu {
	id?: number;
	name: string;
	romanji: string;
	element: string;
	kanji: string;
	symbol?: string;
	details?: {
		spread?: number;
		distance?: number;
	};
}

class Jutsu extends Model<IJutsu> implements IJutsu {
	public id!: number;
	public name!: string;
	public romanji!: string;
	public element!: string;
	public kanji!: string;
	public symbol?: string;
	public details?: { spread?: number; distance?: number };
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Jutsu.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		romanji: {
			type: DataTypes.STRING,
			allowNull: false
		},
		element: {
			type: DataTypes.STRING,
			allowNull: false
		},
		kanji: {
			type: DataTypes.STRING,
			allowNull: false
		},
		symbol: {
			type: DataTypes.STRING,
			allowNull: true
		},
		details: {
			type: DataTypes.JSON,
			allowNull: true,
			defaultValue: { spread: 0, distance: 0 }
		}
	},
	{
		sequelize,
		tableName: 'jutsus',
		timestamps: true
	}
);

export default Jutsu;
