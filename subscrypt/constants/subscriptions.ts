const MUSIC_CREATOR = [
  {
    id: 1,
    name: "0.0048 ETH",
    cost: 0.0048,
    currency: "ETH",
  },
  {
    id: 2,
    name: "0.0062 ETH",
    cost: 0.0062,
    currency: "ETH",
  },
  {
    id: 3,
    name: "0.0074 ETH",
    cost: 0.0074,
    currency: "ETH",
  },
  {
    id: 4,
    name: "0.0095 ETH",
    cost: 0.0095,
    currency: "ETH",
  },
];
const ORG_XYZ = [
  {
    id: 1,
    name: "0.0048 ETH",
    cost: 0.0048,
    currency: "ETH",
  },
  {
    id: 2,
    name: "0.0062 ETH",
    cost: 0.0062,
    currency: "ETH",
  },
  {
    id: 3,
    name: "0.0076 ETH",
    cost: 0.0076,
    currency: "ETH",
  },
  {
    id: 4,
    name: "0.0024 ETH",
    cost: 0.0024,
    currency: "ETH",
  },
];
const GAME_STREAMER = [
  {
    id: 1,
    name: "0.0038 ETH",
    cost: 0.0038,
    currency: "ETH",
  },
  {
    id: 2,
    name: "0.0071 ETH",
    cost: 0.0071,
    currency: "ETH",
  },
];
const MAGAZINE = [
  {
    id: 1,
    name: "0.0038 ETH",
    cost: 0.0038,
    currency: "ETH",
  },
  {
    id: 2,
    name: "0.0052 ETH",
    cost: 0.0052,
    currency: "ETH",
  },
];
const FITNESS_WELLNESS = [
  {
    id: 1,
    name: "0.0057 ETH",
    cost: 0.0057,
    currency: "ETH",
  },
  {
    id: 2,
    name: "0.011 ETH",
    cost: 0.011,
    currency: "ETH",
  },
  {
    id: 3,
    name: "0.0033 ETH",
    cost: 0.0033,
    currency: "ETH",
  },
];
const PRODUCTIVITY = [
  {
    id: 1,
    name: "0.0038 ETH",
    cost: 0.0038,
    currency: "ETH",
  },
  {
    id: 2,
    name: "0.0071 ETH",
    cost: 0.0071,
    currency: "ETH",
  },
];
const ONLINE_LEARNING = [
  {
    id: 1,
    name: "0.0071 ETH",
    cost: 0.0071,
    currency: "ETH",
  },
  {
    id: 2,
    name: "0.0036 ETH",
    cost: 0.0036,
    currency: "ETH",
  },
];
const PERSONAL_YOGA = [
  {
    id: 1,
    name: "0.0014 ETH",
    cost: 0.0014,
    currency: "ETH",
  },
  {
    id: 2,
    name: "0.0024 ETH",
    cost: 0.0024,
    currency: "ETH",
  },
];
const CLOUD_STORAGE = [
  {
    id: 1,
    name: "0.0048 ETH",
    cost: 0.0048,
    currency: "ETH",
  },
];
const FLOWER = [
  {
    id: 1,
    name: "0.0038 ETH",
    cost: 0.0038,
    currency: "ETH",
  },
  {
    id: 2,
    name: "0.0071 ETH",
    cost: 0.0071,
    currency: "ETH",
  },
];

export const SUBSCRIPTION_OPTIONS = [
  {
    id: 1,
    name: "Music Creator Mike",
    plan: MUSIC_CREATOR,
    receiver: "0xB160242ccd7b61b3e351a28FA4ec1593C057ed18",
  },
  {
    id: 2,
    name: "Organization XYZ",
    plan: ORG_XYZ,
    receiver: "0xEaEADD3ca34fD7699C228FbB15eD2c05DE945B00",
  },
  {
    id: 3,
    name: "Game Streamer Junko",
    plan: GAME_STREAMER,
    receiver: "0x62E3fC6168D13c1E7A820D2C293fC48c5e9999BC",
  },
  {
    id: 4,
    name: "Magazine subscription",
    plan: MAGAZINE,
    receiver: "0xb677176d6113c71EDB3Fe17114E914a1de8b0819",
  },
  {
    id: 5,
    name: "Fitness and wellness subscription",
    plan: FITNESS_WELLNESS,
    receiver: "0xe394D420537679073B5af90D120E861Cdd46012B",
  },
  {
    id: 6,
    name: "Productivity tool subscription",
    plan: PRODUCTIVITY,
    receiver: "0x3b63cF410B8fb0B17588BD51505fb0Ef64Bd6F3f",
  },
  {
    id: 7,
    name: "Online learning platform subscription",
    plan: ONLINE_LEARNING,
    receiver: "0x30d3C088FB6e1f3C8e54417Cb385AefdAb39cA3c",
  },
  {
    id: 0.0038,
    name: "Personal yoga subscription",
    plan: PERSONAL_YOGA,
    receiver: "0xB608fDD05D6817bF2acd4E08b7bCe9a6bC05B7Fa",
  },
  {
    id: 9,
    name: "Cloud storage subscription",
    plan: CLOUD_STORAGE,
    receiver: "0x7588Bd8CFB66A58C75c6cc5da9f42BbD43980913",
  },
  {
    id: 10,
    name: "Flower shop subscription",
    plan: FLOWER,
    receiver: "0xEbAD23F8AB1154AB36Cc5D3f9Bad7558081a09b0",
  },
];

export const SUBSCRIPTION_RECEIVERS = SUBSCRIPTION_OPTIONS.map((option) =>
  option.receiver.toLowerCase()
);
