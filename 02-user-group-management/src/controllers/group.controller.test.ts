import { GroupController } from './group-controller';
import { Response, Request, NextFunction } from 'express';
import { GroupService } from '../services';
import { utility } from '../utility';
import { Group } from '../types';
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';

import { mockGroups } from './../__mocks__';

describe('GroupController', () => {
    const groupController = new GroupController();

    let mockRequest: any;
    let mockResponse: any;
    let next: any;

    beforeAll(() => {
        utility.responseUserNotFoundHandler = jest.fn().mockClear();
    });

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn().mockClear(),
            status: jest.fn(() => ({
                json: jest.fn()
            })),
            next: jest.fn()
        };
    });

    describe('getAllGroups', () => {
        test('send data on service return groups array', async () => {
            GroupService.getAllGroups = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockGroups));

            await groupController.getAllGroups(mockRequest, mockResponse);

            expect(GroupService.getAllGroups).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith(mockGroups);
        });

        test('service returns null', async () => {
            const result = null;
            GroupService.getAllGroups = jest
                .fn()
                .mockReturnValue(Promise.resolve(result));

            await groupController.getAllGroups(mockRequest, mockResponse);

            expect(GroupService.getAllGroups).toHaveBeenCalled();
            expect(utility.responseUserNotFoundHandler).toHaveBeenCalled();
        });
    });

    describe('getGroupById', () => {
        beforeEach(() => {
            mockRequest = {
                params: { id: '1' }
            };
        });

        test('send data onservice returns group', async () => {
            GroupService.getGroupById = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockGroups[0]));

            await groupController.getGroupById(mockRequest, mockResponse);

            expect(GroupService.getGroupById).toHaveBeenCalledWith('1');
            expect(mockResponse.json).toHaveBeenCalledWith(mockGroups[0]);
        });

        test('service returns null', async () => {
            const result = null;
            GroupService.getGroupById = jest
                .fn()
                .mockReturnValue(Promise.resolve(result));

            await groupController.getGroupById(mockRequest, mockResponse);

            expect(GroupService.getGroupById).toHaveBeenCalled();
            expect(utility.responseUserNotFoundHandler).toHaveBeenCalled();
        });
    });

    describe('deleteGroup', () => {
        beforeEach(() => {
            mockRequest = {
                params: { id: '1' }
            };
        });

        test('send data on service returns group', async () => {
            GroupService.deleteGroup = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockGroups[0]));

            await groupController.deleteGroup(mockRequest, mockResponse);

            expect(GroupService.deleteGroup).toHaveBeenCalledWith('1');
            expect(mockResponse.json).toHaveBeenCalledWith(mockGroups[0]);
        });

        test('service returns null', async () => {
            const result = null;
            GroupService.deleteGroup = jest
                .fn()
                .mockReturnValue(Promise.resolve(result));

            await groupController.deleteGroup(mockRequest, mockResponse);

            expect(GroupService.deleteGroup).toHaveBeenCalled();
            expect(utility.responseUserNotFoundHandler).toHaveBeenCalled();
        });
    });

    describe('updateGroup', () => {
        beforeEach(() => {
            mockRequest = {
                params: { id: '1' },
                body: mockGroups[0]
            };
        });

        test('send success message on service updates group', async () => {
            GroupService.updateGroup = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockGroups[0]));

            await groupController.updateGroup(mockRequest, mockResponse);

            expect(GroupService.updateGroup).toHaveBeenCalledWith(
                '1',
                mockGroups[0]
            );
            expect(mockResponse.json).toHaveBeenCalled();
        });
    });

    describe('createGroup', () => {
        beforeEach(() => {
            mockRequest = {
                body: mockGroups[0]
            };
        });

        test('send new group on service create group', async () => {
            GroupService.createGroup = jest
                .fn()
                .mockReturnValue(Promise.resolve(mockGroups[0]));

            await groupController.createGroup(mockRequest, mockResponse);

            expect(GroupService.createGroup).toHaveBeenCalledWith(
                mockGroups[0]
            );
            expect(mockResponse.json).toHaveBeenCalledWith(mockGroups[0]);
        });
    });

    describe('addUsersToGroup', () => {
        beforeEach(() => {
            mockRequest = {
                body: {
                    groupId: '1',
                    userIds: ['1', '2']
                }
            };
        });

        test('send success message on service added users to group', async () => {
            GroupService.addUsersToGroup = jest
                .fn()
                .mockReturnValue(Promise.resolve(true));

            await groupController.addUsersToGroup(mockRequest, mockResponse);

            expect(GroupService.addUsersToGroup).toHaveBeenCalledWith('1', [
                '1',
                '2'
            ]);
            expect(mockResponse.json).toHaveBeenCalledWith(
                'Users were added to group'
            );
        });

        test('send 404 message on failed to add users', async () => {
            GroupService.addUsersToGroup = jest
                .fn()
                .mockReturnValue(Promise.resolve(false));

            await groupController.addUsersToGroup(mockRequest, mockResponse);

            expect(GroupService.addUsersToGroup).toHaveBeenCalledWith('1', [
                '1',
                '2'
            ]);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
        });
    });
});
