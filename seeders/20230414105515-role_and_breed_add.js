'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('breeds', [
      {name: 'pug',createdAt: new Date(), updatedAt: new Date()},
      {name: 'afghan hound',createdAt: new Date(), updatedAt: new Date()},
      {name: 'airedale terrier',createdAt: new Date(), updatedAt: new Date()},
      {name: 'akita',createdAt: new Date(), updatedAt: new Date()},
      {name: 'alaskan malamute',createdAt: new Date(), updatedAt: new Date()},
      {name: 'american eskimo',createdAt: new Date(), updatedAt: new Date()},
      {name: 'american foxhound',createdAt: new Date(), updatedAt: new Date()},
      {name: 'american staffordshire terrier',createdAt: new Date(), updatedAt: new Date()},
      {name: 'american water spaniel',createdAt: new Date(), updatedAt: new Date()},
      {name: 'anatolian shepherd',createdAt: new Date(), updatedAt: new Date()},
      {name: 'australian cattle',createdAt: new Date(), updatedAt: new Date()},
      {name: 'australian kelpie',createdAt: new Date(), updatedAt: new Date()},
      {name: 'australian shepherd',createdAt: new Date(), updatedAt: new Date()},
      {name: 'australian terrier',createdAt: new Date(), updatedAt: new Date()},
      {name: 'affenpinscher',createdAt: new Date(), updatedAt: new Date()},
      {name: 'basenji',createdAt: new Date(), updatedAt: new Date()},
      {name: 'basset hound',createdAt: new Date(), updatedAt: new Date()},
      {name: 'beagle',createdAt: new Date(), updatedAt: new Date()},
      {name: 'bearded collie',createdAt: new Date(), updatedAt: new Date()},
      {name: 'bedlington terrier',createdAt: new Date(), updatedAt: new Date()},
      {name: 'belgian malinois',createdAt: new Date(), updatedAt: new Date()},
      {name: 'belgian sheepdog',createdAt: new Date(), updatedAt: new Date()},
      {name: 'belgian tervuren',createdAt: new Date(), updatedAt: new Date()},
      {name: 'bernese mountain',createdAt: new Date(), updatedAt: new Date()},
      {name: 'bichon frise',createdAt: new Date(), updatedAt: new Date()},
      {name: 'black and tan coonhound',createdAt: new Date(), updatedAt: new Date()},
      {name: 'bloodhound',createdAt: new Date(), updatedAt: new Date()},
      {name: 'border collie', createdAt: new Date(), updatedAt: new Date()},
      {name: 'border terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'borzol', createdAt: new Date(), updatedAt: new Date()},
      {name: 'boston terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'bouvier des flandres', createdAt: new Date(), updatedAt: new Date()},
      {name: 'boxer', createdAt: new Date(), updatedAt: new Date()},
      {name: 'briard', createdAt: new Date(), updatedAt: new Date()},
      {name: 'brittany', createdAt: new Date(), updatedAt: new Date()},
      {name: 'brussels griffon', createdAt: new Date(), updatedAt: new Date()},
      {name: 'bull terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'bulldog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'bullmastiff', createdAt: new Date(), updatedAt: new Date()},
      {name: 'cairn terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'canaan', createdAt: new Date(), updatedAt: new Date()},
      {name: 'cardigan welsh corgi', createdAt: new Date(), updatedAt: new Date()},
      {name: 'cavalier king charles spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'chesapeake bay retriever', createdAt: new Date(), updatedAt: new Date()},
      {name: 'chihuahua', createdAt: new Date(), updatedAt: new Date()},
      {name: 'chinese crested', createdAt: new Date(), updatedAt: new Date()},
      {name: 'chinese shar-pei', createdAt: new Date(), updatedAt: new Date()},
      {name: 'chow chow', createdAt: new Date(), updatedAt: new Date()},
      {name: 'clumber spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'cocker spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'collie', createdAt: new Date(), updatedAt: new Date()},
      {name: 'curly-coated retriever', createdAt: new Date(), updatedAt: new Date()},
      {name: 'dachshund', createdAt: new Date(), updatedAt: new Date()},
      {name: 'dalmatian', createdAt: new Date(), updatedAt: new Date()},
      {name: 'dandle dinmont terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'doberman pinscher', createdAt: new Date(), updatedAt: new Date()},
      {name: 'english cocker spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'english foxhound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'english setter', createdAt: new Date(), updatedAt: new Date()},
      {name: 'english springer spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'english toy spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'field spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'finnish spitz', createdAt: new Date(), updatedAt: new Date()},
      {name: 'flat-coated retriever', createdAt: new Date(), updatedAt: new Date()},
      {name: 'french bulldog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'german pinscher', createdAt: new Date(), updatedAt: new Date()},
      {name: 'german shepherd', createdAt: new Date(), updatedAt: new Date()},
      {name: 'german shorthaired pointer', createdAt: new Date(), updatedAt: new Date()},
      {name: 'german wirehaired pointer', createdAt: new Date(), updatedAt: new Date()},
      {name: 'giant schnauzer', createdAt: new Date(), updatedAt: new Date()},
      {name: 'golden retriever', createdAt: new Date(), updatedAt: new Date()},
      {name: 'gordon setter', createdAt: new Date(), updatedAt: new Date()},
      {name: 'great dane', createdAt: new Date(), updatedAt: new Date()},
      {name: 'great pyrenees', createdAt: new Date(), updatedAt: new Date()},
      {name: 'greater swiss mountain', createdAt: new Date(), updatedAt: new Date()},
      {name: 'greyhound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'harrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'havanese', createdAt: new Date(), updatedAt: new Date()},
      {name: 'ibizan hound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'irish setter', createdAt: new Date(), updatedAt: new Date()},
      {name: 'irish terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'irish water spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'irish wolfhound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'italian greyhound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'jack russell terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'japanese chin', createdAt: new Date(), updatedAt: new Date()},
      {name: 'keeshond', createdAt: new Date(), updatedAt: new Date()},
      {name: 'kerry blue terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'komondor', createdAt: new Date(), updatedAt: new Date()},
      {name: 'kuvasz', createdAt: new Date(), updatedAt: new Date()},
      {name: 'labrador retriever', createdAt: new Date(), updatedAt: new Date()},
      {name: 'lakeland terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'lhasa apso', createdAt: new Date(), updatedAt: new Date()},
      {name: 'lowchen', createdAt: new Date(), updatedAt: new Date()},
      {name: 'maltese', createdAt: new Date(), updatedAt: new Date()},
      {name: 'manchester terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'mastiff', createdAt: new Date(), updatedAt: new Date()},
      {name: 'miniature bull terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'miniature pinscher', createdAt: new Date(), updatedAt: new Date()},
      {name: 'miniature schnauzer', createdAt: new Date(), updatedAt: new Date()},
      {name: 'newfoundland', createdAt: new Date(), updatedAt: new Date()},
      {name: 'norfolk terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'norwegian elkhound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'norwich terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'old english sheepdog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'otterhound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'papillon', createdAt: new Date(), updatedAt: new Date()},
      {name: 'pekingese', createdAt: new Date(), updatedAt: new Date()},
      {name: 'pembroke welsh corgi', createdAt: new Date(), updatedAt: new Date()},
      {name: 'petits bassets griffons vendeen', createdAt: new Date(), updatedAt: new Date()},
      {name: 'pharaoh hound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'plott', createdAt: new Date(), updatedAt: new Date()},
      {name: 'pointer', createdAt: new Date(), updatedAt: new Date()},
      {name: 'polish lowland sheepdog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'pomeranian', createdAt: new Date(), updatedAt: new Date()},
      {name: 'poodle', createdAt: new Date(), updatedAt: new Date()},
      {name: 'portuguese water', createdAt: new Date(), updatedAt: new Date()},
      // {name: 'pug', createdAt: new Date(), updatedAt: new Date()},
      {name: 'puli', createdAt: new Date(), updatedAt: new Date()},
      {name: 'rat terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'rhodesian ridgeback', createdAt: new Date(), updatedAt: new Date()},
      {name: 'rottweiler', createdAt: new Date(), updatedAt: new Date()},
      {name: 'saluki', createdAt: new Date(), updatedAt: new Date()},
      {name: 'samoyed', createdAt: new Date(), updatedAt: new Date()},
      {name: 'schipperke', createdAt: new Date(), updatedAt: new Date()},
      {name: 'scottish deerhound', createdAt: new Date(), updatedAt: new Date()},
      {name: 'scottish terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'sealyham terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'sheltie', createdAt: new Date(), updatedAt: new Date()},
      {name: 'shetland sheepdog', createdAt: new Date(), updatedAt: new Date()},
      {name: 'shiba inu', createdAt: new Date(), updatedAt: new Date()},
      {name: 'shih tzu', createdAt: new Date(), updatedAt: new Date()},
      {name: 'siberian husky', createdAt: new Date(), updatedAt: new Date()},
      {name: 'silky terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'skye terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'smooth fox terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'soft coated wheaten terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'spinone italiano', createdAt: new Date(), updatedAt: new Date()},
      {name: 'st. bernard', createdAt: new Date(), updatedAt: new Date()},
      {name: 'staffordshire bull terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'standard schnauzer', createdAt: new Date(), updatedAt: new Date()},
      {name: 'sussex spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'tibetan spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'tibetan terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'toy fox terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'vizsla', createdAt: new Date(), updatedAt: new Date()},
      {name: 'weimaraner', createdAt: new Date(), updatedAt: new Date()},
      {name: 'welsh springer spaniel', createdAt: new Date(), updatedAt: new Date()},
      {name: 'welsh terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'west highland white terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'whippet', createdAt: new Date(), updatedAt: new Date()},
      {name: 'wire fox terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'wirehaired pointing griffon', createdAt: new Date(), updatedAt: new Date()},
      {name: 'yorkshire terrier', createdAt: new Date(), updatedAt: new Date()},
      {name: 'mixed or other', createdAt: new Date(), updatedAt: new Date()},
   ])
   await queryInterface.bulkInsert('roles', [
    {
      name: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
