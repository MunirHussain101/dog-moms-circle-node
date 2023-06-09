'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('breeds', null, {})
    await queryInterface.bulkInsert('breeds', [
      {name: 'Mixed',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Others',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Goldendoodle',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Labradoodle',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Cockapoo',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Bernedoodle',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Aussiedoodle',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Sheepadoodle',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Cavapoo',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Maltipoo',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Newfypoo',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Irish Doodle',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Labrador Retriever',createdAt: new Date(), updatedAt: new Date()},
      {name: 'French Bulldog',createdAt: new Date(), updatedAt: new Date()},
      {name: 'German Shepherd Dog',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Golden Retriever',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Bulldog',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Poodle',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Beagle',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Rottweiler',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Yorkshire Terrier',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Dachshund',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Boxer',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Siberian Husky',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Doberman Pinscher',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Australian Shepherd',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Great Dane',createdAt: new Date(), updatedAt: new Date()},
      {name: 'Cavalier King Charles Spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Shih Tzu', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Boston Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Bernese Mountain Dog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Pembroke Welsh Corgi', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Miniature Schnauzer', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Cane Corso', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Australian Cattle Dog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'English Springer Spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Bichon Frise', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Border Collie', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Havanese', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Brittany', createdAt: new Date(), updatedAt: new Date()},
      {name: 'West Highland White Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Bullmastiff', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Weimaraner', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Shetland Sheepdog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Vizsla', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Scottish Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Saint Bernard', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Chow Chow', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Alaskan Malamute', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Whippet', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Chesapeake Bay Retriever', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Portuguese Water Dog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Akita', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Bloodhound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'American Staffordshire Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Lhasa Apso', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Giant Schnauzer', createdAt: new Date(), updatedAt: new Date()},
      {name: 'English Cocker Spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'English Bulldog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Shiba Inu', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Irish Setter', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Samoyed', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Bull Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Collie', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Welsh Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Chinese Shar-Pei', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Greyhound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Staffordshire Bull Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Basenji', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Irish Wolfhound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Afghan Hound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Belgian Malinois', createdAt: new Date(), updatedAt: new Date()},
      {name: 'American Eskimo Dog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Newfoundland', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Brussels Griffon', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Pharaoh Hound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Wirehaired Pointing Griffon', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Border Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Soft Coated Wheaten Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Scottish Deerhound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Glen of Imaal Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Norwich Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Spinone Italiano', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Bull Terrier (Miniature)', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Ibizan Hound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Finnish Lapphund', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Dalmatian', createdAt: new Date(), updatedAt: new Date()},
      {name: 'American Water Spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Pointer', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Plott', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Black Russian Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Anatolian Shepherd Dog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Tibetan Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Norwegian Elkhound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Leonberger', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Irish Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Sealyham Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Flat-Coated Retriever', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Cardigan Welsh Corgi', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Curly-Coated Retriever', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Saluki', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Entlebucher Mountain Dog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Finnish Spitz', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Japanese Chin', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Bedlington Terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Field Spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Irish Water Spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Sussex Spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Norwegian Lundehund', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Greater Swiss Mountain Dog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Pyrenean Shepherd', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Skye Terrier', createdAt: new Date(), updatedAt: new Date()},
    ])

   await queryInterface.bulkInsert('roles', [{name: 'user', createdAt: new Date(),updatedAt: new Date()}])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('breeds', null, {})
    await queryInterface.bulkDelete('roles', null, {})
  }
};
