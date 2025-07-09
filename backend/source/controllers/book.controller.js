import { Book, BookImage } from "../models/index.js";

// Create (Sell) a Book
export const sellBook = async (req, res) => {
  try {
    // You may want to get seller_id from req.user if using authentication
    const { images, ...bookData } = req.body;
    const book = await Book.create(bookData);

    // Handle book images if provided
    if (images && Array.isArray(images)) {
      const imageRecords = images.map((url) => ({
        book_id: book.book_id,
        image_url: url,
      }));
      await BookImage.bulkCreate(imageRecords);
    }

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Book by ID (with images)
export const getBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [{ model: BookImage }]
    });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    await book.update(req.body);
    res.json({ message: "Book updated", book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    await book.destroy();
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};