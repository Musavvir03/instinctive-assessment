const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Cameras
  await prisma.camera.createMany({
    data: [
      { name: 'Shop Floor A', location: 'Ground Floor' },
      { name: 'Vault', location: 'Basement' },
      { name: 'Entrance', location: 'Main Door' },
    ],
  });

  // Fetch camera IDs
  const allCameras = await prisma.camera.findMany();

  // Helper for random camera
  const getCameraId = (idx: number) => allCameras[idx % allCameras.length].id;

  // Incidents
  const now = new Date();
  const oneHour = 60 * 60 * 1000;
  const incidents = [
    { type: 'Unauthorised Access', cameraId: getCameraId(0), tsStart: new Date(now.getTime() - oneHour * 1), tsEnd: new Date(now.getTime() - oneHour * 1 + 5 * 60 * 1000), thumbnailUrl: '/thumb1.jpg', resolved: false },
    { type: 'Gun Threat', cameraId: getCameraId(1), tsStart: new Date(now.getTime() - oneHour * 2), tsEnd: new Date(now.getTime() - oneHour * 2 + 3 * 60 * 1000), thumbnailUrl: '/thumb2.jpg', resolved: false },
    { type: 'Face Recognised', cameraId: getCameraId(2), tsStart: new Date(now.getTime() - oneHour * 3), tsEnd: new Date(now.getTime() - oneHour * 3 + 2 * 60 * 1000), thumbnailUrl: '/thumb3.jpg', resolved: true },
    { type: 'Unauthorised Access', cameraId: getCameraId(1), tsStart: new Date(now.getTime() - oneHour * 4), tsEnd: new Date(now.getTime() - oneHour * 4 + 4 * 60 * 1000), thumbnailUrl: '/thumb1.jpg', resolved: false },
    { type: 'Gun Threat', cameraId: getCameraId(0), tsStart: new Date(now.getTime() - oneHour * 5), tsEnd: new Date(now.getTime() - oneHour * 5 + 6 * 60 * 1000), thumbnailUrl: '/thumb2.jpg', resolved: true },
    { type: 'Face Recognised', cameraId: getCameraId(2), tsStart: new Date(now.getTime() - oneHour * 6), tsEnd: new Date(now.getTime() - oneHour * 6 + 2 * 60 * 1000), thumbnailUrl: '/thumb3.jpg', resolved: false },
    { type: 'Unauthorised Access', cameraId: getCameraId(2), tsStart: new Date(now.getTime() - oneHour * 7), tsEnd: new Date(now.getTime() - oneHour * 7 + 5 * 60 * 1000), thumbnailUrl: '/thumb1.jpg', resolved: false },
    { type: 'Gun Threat', cameraId: getCameraId(1), tsStart: new Date(now.getTime() - oneHour * 8), tsEnd: new Date(now.getTime() - oneHour * 8 + 3 * 60 * 1000), thumbnailUrl: '/thumb2.jpg', resolved: false },
    { type: 'Face Recognised', cameraId: getCameraId(0), tsStart: new Date(now.getTime() - oneHour * 9), tsEnd: new Date(now.getTime() - oneHour * 9 + 2 * 60 * 1000), thumbnailUrl: '/thumb3.jpg', resolved: true },
    { type: 'Unauthorised Access', cameraId: getCameraId(0), tsStart: new Date(now.getTime() - oneHour * 10), tsEnd: new Date(now.getTime() - oneHour * 10 + 4 * 60 * 1000), thumbnailUrl: '/thumb1.jpg', resolved: false },
    { type: 'Gun Threat', cameraId: getCameraId(2), tsStart: new Date(now.getTime() - oneHour * 11), tsEnd: new Date(now.getTime() - oneHour * 11 + 6 * 60 * 1000), thumbnailUrl: '/thumb2.jpg', resolved: true },
    { type: 'Face Recognised', cameraId: getCameraId(1), tsStart: new Date(now.getTime() - oneHour * 12), tsEnd: new Date(now.getTime() - oneHour * 12 + 2 * 60 * 1000), thumbnailUrl: '/thumb3.jpg', resolved: false },
  ];

  for (const incident of incidents) {
    await prisma.incident.create({ data: incident });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 