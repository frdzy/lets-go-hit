import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });
  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@prisma.io",
    },
  });

  const court = await prisma.courtLocation.create({
    data: {
      name: "Golden Gate Park",
      addedById: alice.id,
    },
  });

  const reservation = await prisma.reservation.create({
    data: {
      beginTimestamp: new Date(),
      endTimestamp: new Date(),
      courtLocationId: court.id,
      byUserId: alice.id,
    },
  });

  const schedule = await prisma.schedule.create({
    data: {
      beginTimestamp: new Date(),
      reservationId: reservation.id,
      byUserId: alice.id,
    },
  });

  const confirmationAlice = await prisma.confirmation.create({
    data: {
      playerId: alice.id,
      status: "confirmed",
      scheduleId: schedule.id,
    },
  });

  const confirmationBob = await prisma.confirmation.create({
    data: {
      playerId: bob.id,
      status: "confirmed",
      scheduleId: schedule.id,
    },
  });

  console.log("alice", alice);
  console.log("court", court);
  console.log("reservation", reservation);
  console.log("schedule", schedule);
  console.log("confirmationAlice", confirmationAlice);
  console.log("confirmationBob", confirmationBob);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
