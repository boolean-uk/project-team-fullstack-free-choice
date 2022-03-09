const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createBooks() {
    const books = await prisma.book.createMany({
        data: [
            {
                title: "hfsfisd",
                isbn: "8uifbw",
                description: "jfisfj fdsdf",
                cover: "fsdfis",
                authors: [
                    {
                        name: "Theuyidj"
                    },
                ],
                genres: []
            }
        ]
    })
}