import { UserService } from '../services';
import { utility } from '../utility';
import { mockUsers } from './../__mocks__/users';
import { UserController } from './user-controller';

describe('UserController', () => {
    const userController = new UserController();

    let mockRequest: any;
    let mockResponse: any;

    beforeAll(() => {
        utility.responseUserNotFoundHandler = jest.fn().mockClear();
    });

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn(() => ({
                json: jest.fn()
            })),
            next: jest.fn()
        };
    });

    describe('getAllUsers', () => {
        test('send data on service return users array', async () => {
            UserService.getAllUsers = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockUsers));

            await userController.getAllUsers(mockRequest, mockResponse);

            expect(UserService.getAllUsers).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
        });

        test('service returns null', async () => {
            const result = null;
            UserService.getAllUsers = jest
                .fn()
                .mockReturnValue(Promise.resolve(result));

            await userController.getAllUsers(mockRequest, mockResponse);

            expect(UserService.getAllUsers).toHaveBeenCalled();
            expect(utility.responseUserNotFoundHandler).toHaveBeenCalled();
        });
    });

    describe('getUser', () => {
        beforeEach(() => {
            mockRequest = {
                params: { id: '1' }
            };
        });

        test('send data on service returns user', async () => {
            UserService.getUserById = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockUsers[0]));

            await userController.getUser(mockRequest, mockResponse);

            expect(UserService.getUserById).toHaveBeenCalledWith('1');
            expect(mockResponse.json).toHaveBeenCalledWith(mockUsers[0]);
        });

        test('service returns null', async () => {
            const result = null;
            UserService.getUserById = jest
                .fn()
                .mockReturnValue(Promise.resolve(result));

            await userController.getUser(mockRequest, mockResponse);

            expect(UserService.getUserById).toHaveBeenCalled();
            expect(utility.responseUserNotFoundHandler).toHaveBeenCalled();
        });
    });

    describe('deleteUser', () => {
        beforeEach(() => {
            mockRequest = {
                params: { id: '1' }
            };
        });

        test('send data on service returns user', async () => {
            UserService.deleteUser = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockUsers[0]));

            await userController.deleteUser(mockRequest, mockResponse);

            expect(UserService.deleteUser).toHaveBeenCalledWith('1');
            expect(mockResponse.json).toHaveBeenCalledWith(mockUsers[0]);
        });

        test('service returns null', async () => {
            const result = null;
            UserService.deleteUser = jest
                .fn()
                .mockReturnValue(Promise.resolve(result));

            await userController.deleteUser(mockRequest, mockResponse);

            expect(UserService.deleteUser).toHaveBeenCalled();
            expect(utility.responseUserNotFoundHandler).toHaveBeenCalled();
        });
    });

    describe('updateUser', () => {
        beforeEach(() => {
            mockRequest = {
                params: { id: '1' },
                body: mockUsers[0]
            };
        });

        test('send success message on service updates user', async () => {
            UserService.updateUser = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockUsers[0]));

            await userController.updateUser(mockRequest, mockResponse);

            expect(UserService.updateUser).toHaveBeenCalledWith(
                '1',
                mockUsers[0]
            );
            expect(mockResponse.json).toHaveBeenCalled();
        });
    });

    describe('createUser', () => {
        beforeEach(() => {
            mockRequest = {
                body: mockUsers[0]
            };
        });

        test('send new user on service create user', async () => {
            UserService.createUser = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockUsers[0]));

            await userController.createUser(mockRequest, mockResponse);

            expect(UserService.createUser).toHaveBeenCalledWith(mockUsers[0]);
            expect(mockResponse.json).toHaveBeenCalledWith(mockUsers[0]);
        });
    });
});
