const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.post('/', async (request, response) => {
  const body = request.body;

  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password is too short' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1 });
  response.json(users);
});

userRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('notes', { content: 1, date: 1 });
  response.json(user);
});

userRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

userRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const user = {
    username: body.username,
    name: body.name,
    passwordHash: body.passwordHash,
  };

  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true });
  response.json(updatedUser);
});

module.exports = userRouter;