import {Book} from "../models/index.js"

export const sellBook = async (req,res) =>
{
    try
    {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}

export const getBook = async (req,res) =>
{

}

export const updateBook = async (req,res) =>
{

}

export const deleteBook = async (req,res) =>
{

}