import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Book = sequelize.define('Book', {
  book_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING(100),
  },
  isbn: {
    type: DataTypes.STRING(20),
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  contact_info: {
    type: DataTypes.STRING(100),
  },
  status: {
    type: DataTypes.ENUM('available', 'sold', 'pending'),
    defaultValue: 'available',
  },
  listed_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'books',
  timestamps: false,
  underscored: true,
});

export default Book;

