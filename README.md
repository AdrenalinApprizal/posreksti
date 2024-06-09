# <h1 align="center"> Tugas Besar Rekayasa Sistem dan Teknologi Informasi <h4 align="center"> Kelompok 14 K01 </h4> </h1>

## Point Of Sales

<p align="justify"> Platform Point Of Sales menyediakan inovasi sistem yang berkomitmen untuk membantu kasir pada kafe berjalan dengan efisien dan efektif. <p>

## Anggota Kelompok 14



## Alur Penggunaan

<p align="justify"> Alur penggunaan dari easefarm ini dimulai dari 
  1. Melakukan login dengan username : admin dan password : admin
  2. Melihat produk yang tersedia
  3. Melakukan pemesanan produk
  4. Melakukan transaksi
</p>

## How to start this website?

Sebelum menjalankan perangkat lunak ini memerlukan beberapa tools yang harus diinstal terlebih dahulu

1. Visual Studio Code
2. Node js : https://nodejs.org/en/
3. Git Bash : jangan lupa melakukan config terlebih dahulu

Setelah menginstal hal tersebut, maka berikut adalah langkah untuk menjalankan perangkat lunak :

1. Git Clone : https://https://github.com/AdrenalinApprizal/posreksti.git
2. Buka folder tersebut pada Visual Studio Code
3. Lakukan npm i pada terminal
4. Ubah isi file .env menjadi berikut

```bash
    \# Environment variables declared in this file are automatically made available to Prisma.
    \# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

    \# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
    \# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

    DATABASE_URL="mongodb+srv://adrenalinaapprizal:EoQNOQdKB3z8k7mB@cluster0.cjqoqzj.mongodb.net/post-client?retryWrites=true&w=majority"
    NEXT_PUBLIC_WEB_URL="http://localhost:3000"
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="secret"
```

5. Lalu ketik npx prisma generate
6. Selanjutnya, ketik

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

7. Buka http://localhost:3000 dengan browser untuk melihat website

## Referensi

### Commit Message Semantics

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.