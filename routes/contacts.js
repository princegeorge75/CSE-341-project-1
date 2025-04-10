const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Get ALL contacts
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: A list of all contacts
 */
router.get('/', async (req, res) => {
    try {
      const contacts = await Contact.find(); // Get everything from the collection
      res.status(200).json(contacts);        // Send the result back as JSON
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Get ONE contact by ID
/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: A single contact
 */
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

// Create a new contact
/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 */
router.post('/', async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body; // Destructure data from the request body
    
    // Check if all fields are present
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });  // Return error if any field is missing
    }
  
    // Create a new contact instance using the Contact model
    const contact = new Contact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    });
  
    try {
      // Save the contact to the database
      const newContact = await contact.save();
      res.status(201).json({ id: newContact._id });  // Return the ID of the newly created contact
    } catch (err) {
      res.status(500).json({ message: err.message });  // Handle any errors during saving
    }
  });
  
// Update an existing contact by ID
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update an existing contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the contact to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    try {
      // Find the contact by ID from the URL
      const contact = await Contact.findById(req.params.id);
      
      // If no contact is found, return a 404 error
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      // Update the contact's fields only if new values are provided
      contact.firstName = firstName || contact.firstName;
      contact.lastName = lastName || contact.lastName;
      contact.email = email || contact.email;
      contact.favoriteColor = favoriteColor || contact.favoriteColor;
      contact.birthday = birthday || contact.birthday;
  
      // Save the updated contact
      await contact.save();
      
      res.status(200).json({ message: 'Contact updated successfully' });  // Return a success message
    } catch (err) {
      res.status(500).json({ message: err.message });  // Handle errors
    }
  });

// Delete a contact by ID
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the contact to delete
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    try {
      // Find and delete the contact by ID
      const contact = await Contact.findByIdAndDelete(req.params.id);
      
      // If no contact is found, return a 404 error
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
  
      // Return a success message
      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });  // Handle any errors
    }
  });
  

module.exports = router;
