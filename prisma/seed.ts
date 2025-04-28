// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// Create an instance of PrismaClient
const prisma = new PrismaClient()

async function main() {
    // Create Departments
    const shiftManagerDept = await prisma.department.upsert({
        where: { name: 'Shift Manager' },
        update: {},
        create: { name: 'Shift Manager' },
    });

    const cashdeskDept = await prisma.department.upsert({
        where: { name: 'Cashdesk' },
        update: {},
        create: { name: 'Cashdesk' },
    });

    // Hash passwords
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Users
    await prisma.user.createMany({
        data: [
            {
                username: 'karen',
                email: 'manager@casino.com',
                password: hashedPassword,
                role: 'shift_manager',
                departmentId: shiftManagerDept.id,
                firstName: '',
                lastName: '',
                phone: '',
                address: '',
                dateOfBirth: '',
                hireDate: '',
                salary: 0
            },
            {
                email: 'operator@casino.com',
                password: hashedPassword,
                role: 'cashdesk_operator',
                departmentId: cashdeskDept.id,
                username: '',
                firstName: '',
                lastName: '',
                phone: '',
                address: '',
                dateOfBirth: '',
                hireDate: '',
                salary: 0
            },
            {
                email: 'supervisor@casino.com',
                password: hashedPassword,
                role: 'cashdesk_supervisor',
                departmentId: cashdeskDept.id,
                username: '',
                firstName: '',
                lastName: '',
                phone: '',
                address: '',
                dateOfBirth: '',
                hireDate: '',
                salary: 0
            },
        ],
    });
}

// Run the seed script
main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
