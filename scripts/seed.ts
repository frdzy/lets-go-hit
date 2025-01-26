import { db } from 'api/src/lib/db';

export default async () => {
  console.log(
    "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n",

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
  );
  try {
    const alice = await db.user.create({
      data: {
        name: 'Alice',
        email: 'alice@db.io',
      },
    });
    const bob = await db.user.create({
      data: {
        name: 'Bob',
        email: 'bob@db.io',
      },
    });

    const court = await db.courtLocation.create({
      data: {
        name: 'Golden Gate Park',
        addedById: alice.id,
      },
    });

    const reservation = await db.reservation.create({
      data: {
        beginTimestamp: new Date(),
        endTimestamp: new Date(),
        courtLocationId: court.id,
        byUserId: alice.id,
      },
    });

    const schedule = await db.schedule.create({
      data: {
        beginTimestamp: new Date(),
        reservationId: reservation.id,
        createdByUserId: alice.id,
      },
    });

    const confirmationAlice = await db.confirmation.create({
      data: {
        playerId: alice.id,
        status: 'confirmed',
        scheduleId: schedule.id,
      },
    });

    const confirmationBob = await db.confirmation.create({
      data: {
        playerId: bob.id,
        status: 'confirmed',
        scheduleId: schedule.id,
      },
    });

    console.log('alice', alice);
    console.log('court', court);
    console.log('reservation', reservation);
    console.log('schedule', schedule);
    console.log('confirmationAlice', confirmationAlice);
    console.log('confirmationBob', confirmationBob);

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //
    //   for (user of users) {
    //     const [hashedPassword, salt] = hashPassword(user.password)
    //     await db.user.create({
    //       data: {
    //         name: user.name,
    //         email: user.email,
    //         hashedPassword,
    //         salt
    //       }
    //     })
    //   }
  } catch (error) {
    console.warn('Please define your seed data.');
    console.error(error);
  }
};
