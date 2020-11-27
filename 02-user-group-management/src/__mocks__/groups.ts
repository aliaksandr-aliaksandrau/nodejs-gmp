import { Group } from '../types';

export const mockGroups: Group[] = [
    {
        id: '1',
        name: 'group1',
        permissions: ['READ', 'WRITE']
    },
    {
        id: '2',
        name: 'group2',
        permissions: ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES']
    },
    {
        id: '3',
        name: 'group3',
        permissions: []
    }
];
