const expect = require('expect');

const { User } = require('./../utils/User');

describe('User', () => {
  let users;
  
  beforeEach(() => {
    users = new User();
    users.users = [{
      id: '123',
      name: 'Ivan',
      room: 'Node Course'
    }, {
      id: 'abc',
      name: 'Paty',
      room: 'CNV Course'
    }, {
      id: 'miau',
      name: 'Fifi',
      room: 'Food Course'
    }, {
      id: 'miau',
      name: 'Titi',
      room: 'Food Course'
    }];
  });


  it('should add a new user', () => {
    users = new User();
    const user = {
      id: '123',
      name: 'Ivan',
      room: 'Node Course'
    };

    const newUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([newUser]);

  });

  it('should return names for the Food Course', () => {
    const userList = users.getUserList('Food Course');
    expect(userList).toEqual(['Fifi', 'Titi']);
  });

  it('should return names for the CNV Course', () => {
    const userList = users.getUserList('CNV Course');
    expect(userList).toEqual(['Paty']);
  });

  it('should find user', () => {
    const userId = 'abc';
    const result = users.getUserById(userId);
    expect(result).toBeDefined;
  });

  it('should not find user', () => {
    const userId = 'zyx';
    const result = users.getUserById(userId);
    expect(result).toBeUndefined;
  });

  it('should remove a user', () => {
    const userId = '123';
    const removedUser = users.removeUser(userId);
    expect(removedUser.id).toBe(userId);
    expect(users.users.length).toBe(3);
  });

  it('should not remove a user', () => {
    const userId = 'zyx';
    const removedUser = users.removeUser(userId);
    console.log(removedUser);
    expect(removedUser).toBeUndefined;
    expect(users.users.length).toBe(4);
  });
})