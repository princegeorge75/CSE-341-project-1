const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Get ALL contacts
router.get('/', async (req, res) => {
    try {
      const contacts = await Contact.find(); // Get everything from the collection
      res.status(200).json(contacts);        // Send the result back as JSON
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Get ONE contact by ID
router.get('/:id', async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id); // Use the URL ID
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
