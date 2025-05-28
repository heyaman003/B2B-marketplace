import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const televisions = await prisma.category.create({
    data: {
      name: 'Televisions',
      slug: 'televisions',
      attributeSchema: {
        screenSize: { 
          type: 'string', 
          enum: ['32"', '40"', '43"', '50"', '55"', '65"'] 
        },
        resolution: { 
          type: 'string', 
          enum: ['720p', '1080p', '4K'] 
        },
        brand: { 
          type: 'string', 
          enum: [
            'Samsung', 
            'LG', 
            'Sony', 
            'Mi', 
            'OnePlus', 
            'Vu', 
            'TCL', 
            'Realme', 
            'Panasonic', 
            'Haier', 
            'AmazonBasics', 
            'Intex'
          ] 
        },
        smartTV: { 
          type: 'boolean' 
        }
      }
    }
  });
  
  const runningShoes = await prisma.category.create({
    data: {
      name: 'Running Shoes',
      slug: 'running-shoes',
      attributeSchema: {
        size: { 
          type: 'string', 
          enum: ['6', '7', '8', '9', '10', '11', '12'] 
        },
        color: { 
          type: 'string', 
          enum: ['Black', 'White', 'Red', 'Blue', 'Green', 'Grey'] 
        },
        brand: { 
          type: 'string', 
          enum: [
            'Nike', 
            'Adidas', 
            'New Balance', 
            'Brooks', 
            'Asics', 
            'Puma', 
            'Reebok'
          ] 
        },
        type: { 
          type: 'string', 
          enum: ['Road', 'Trail', 'Track', 'Treadmill'] 
        }
      }
    }
  });
  
  

// Create TV listings for Indian cities
const tvListings = [
  {
    title: 'Samsung 4K Smart TV',
    description: '55-inch Samsung 4K Smart TV with HDR and built-in streaming apps',
    price: 47999,
    location: 'Kankarbagh, Patna, Bihar',
    categoryId: televisions.id,
    attributes: {
      screenSize: '55"',
      resolution: '4K',
      brand: 'Samsung',
      smartTV: true
    }
  },
  {
    title: 'LG OLED TV',
    description: '65-inch LG OLED TV with perfect blacks and stunning picture quality',
    price: 114999,
    location: 'Salt Lake, Kolkata, West Bengal',
    categoryId: televisions.id,
    attributes: {
      screenSize: '65"',
      resolution: '4K',
      brand: 'LG',
      smartTV: true
    }
  },
  {
    title: 'Sony Bravia 4K LED',
    description: '50-inch Sony Bravia LED TV with Dolby Vision and Android TV',
    price: 63999,
    location: 'Gomti Nagar, Lucknow, Uttar Pradesh',
    categoryId: televisions.id,
    attributes: {
      screenSize: '50"',
      resolution: '4K',
      brand: 'Sony',
      smartTV: true
    }
  },
  {
    title: 'Mi LED TV 4X',
    description: '43-inch Mi TV with PatchWall and built-in Chromecast',
    price: 29999,
    location: 'Banjara Hills, Hyderabad, Telangana',
    categoryId: televisions.id,
    attributes: {
      screenSize: '43"',
      resolution: '4K',
      brand: 'Mi',
      smartTV: true
    }
  },
  {
    title: 'OnePlus Y Series',
    description: '40-inch Full HD LED Smart Android TV',
    price: 26999,
    location: 'Andheri East, Mumbai, Maharashtra',
    categoryId: televisions.id,
    attributes: {
      screenSize: '40"',
      resolution: '1080p',
      brand: 'OnePlus',
      smartTV: true
    }
  },
  {
    title: 'Vu Premium TV',
    description: '55-inch 4K Ultra HD Smart TV with Dolby Audio',
    price: 32999,
    location: 'Civil Lines, Jaipur, Rajasthan',
    categoryId: televisions.id,
    attributes: {
      screenSize: '55"',
      resolution: '4K',
      brand: 'Vu',
      smartTV: true
    }
  },
  {
    title: 'TCL Android TV',
    description: '50-inch 4K UHD Smart TV with HDR10 support',
    price: 34990,
    location: 'Anna Nagar, Chennai, Tamil Nadu',
    categoryId: televisions.id,
    attributes: {
      screenSize: '50"',
      resolution: '4K',
      brand: 'TCL',
      smartTV: true
    }
  },
  {
    title: 'Realme Smart TV X',
    description: '43-inch Full HD Smart Android TV with powerful speakers',
    price: 23999,
    location: 'Aliganj, Lucknow, Uttar Pradesh',
    categoryId: televisions.id,
    attributes: {
      screenSize: '43"',
      resolution: '1080p',
      brand: 'Realme',
      smartTV: true
    }
  },
  {
    title: 'Panasonic 4K LED TV',
    description: '55-inch Smart TV with adaptive backlight dimming',
    price: 42999,
    location: 'Vesu, Surat, Gujarat',
    categoryId: televisions.id,
    attributes: {
      screenSize: '55"',
      resolution: '4K',
      brand: 'Panasonic',
      smartTV: true
    }
  },
  {
    title: 'Haier Bezel-Less Smart TV',
    description: '43-inch Android TV with voice remote and Google Assistant',
    price: 21990,
    location: 'Sector 17, Chandigarh, Punjab',
    categoryId: televisions.id,
    attributes: {
      screenSize: '43"',
      resolution: '1080p',
      brand: 'Haier',
      smartTV: true
    }
  },
  {
    title: 'AmazonBasics Fire TV',
    description: '50-inch Smart LED TV with Fire OS and Alexa voice control',
    price: 28999,
    location: 'Thane West, Thane, Maharashtra',
    categoryId: televisions.id,
    attributes: {
      screenSize: '50"',
      resolution: '4K',
      brand: 'AmazonBasics',
      smartTV: true
    }
  },
  {
    title: 'Intex LED-SH7504',
    description: '32-inch HD Ready LED TV for compact entertainment spaces',
    price: 12990,
    location: 'TT Nagar, Bhopal, Madhya Pradesh',
    categoryId: televisions.id,
    attributes: {
      screenSize: '32"',
      resolution: '720p',
      brand: 'Intex',
      smartTV: false
    }
  }
];


// Create running shoe listings for Indian cities
const shoeListings = [
  {
    title: 'Nike Air Zoom Pegasus',
    description: 'Versatile running shoes for daily training and long runs',
    price: 8999,
    location: 'Bandra, Mumbai, Maharashtra',
    categoryId: runningShoes.id,
    attributes: {
      size: '10',
      color: 'Black',
      brand: 'Nike',
      type: 'Road'
    }
  },
  {
    title: 'Adidas Ultraboost',
    description: 'Premium running shoes with responsive Boost cushioning',
    price: 12999,
    location: 'Salt Lake, Kolkata, West Bengal',
    categoryId: runningShoes.id,
    attributes: {
      size: '9',
      color: 'White',
      brand: 'Adidas',
      type: 'Road'
    }
  },
  {
    title: 'Asics Gel-Kayano',
    description: 'Stability running shoes designed for overpronation',
    price: 11499,
    location: 'Indiranagar, Bangalore, Karnataka',
    categoryId: runningShoes.id,
    attributes: {
      size: '8',
      color: 'Blue',
      brand: 'Asics',
      type: 'Road'
    }
  },
  {
    title: 'Puma Velocity Nitro',
    description: 'Lightweight shoes for everyday runs with great energy return',
    price: 7499,
    location: 'Banjara Hills, Hyderabad, Telangana',
    categoryId: runningShoes.id,
    attributes: {
      size: '9',
      color: 'Red',
      brand: 'Puma',
      type: 'Road'
    }
  },
  {
    title: 'Reebok Floatride Energy',
    description: 'Affordable, responsive, and durable trainers',
    price: 5999,
    location: 'Viman Nagar, Pune, Maharashtra',
    categoryId: runningShoes.id,
    attributes: {
      size: '10',
      color: 'Grey',
      brand: 'Reebok',
      type: 'Road'
    }
  },
  {
    title: 'Skechers GoRun Ride',
    description: 'Comfortable and well-cushioned shoes for daily training',
    price: 5499,
    location: 'Aliganj, Lucknow, Uttar Pradesh',
    categoryId: runningShoes.id,
    attributes: {
      size: '7',
      color: 'Navy Blue',
      brand: 'Skechers',
      type: 'Road'
    }
  },
  {
    title: 'New Balance Fresh Foam',
    description: 'Plush cushioning for long-distance running',
    price: 8990,
    location: 'Anna Nagar, Chennai, Tamil Nadu',
    categoryId: runningShoes.id,
    attributes: {
      size: '8',
      color: 'Green',
      brand: 'New Balance',
      type: 'Road'
    }
  },
  {
    title: 'Nike Revolution 6',
    description: 'Budget-friendly shoes for beginners and casual runners',
    price: 3999,
    location: 'Sadar, Nagpur, Maharashtra',
    categoryId: runningShoes.id,
    attributes: {
      size: '9',
      color: 'Black',
      brand: 'Nike',
      type: 'Road'
    }
  },
  {
    title: 'Decathlon Kalenji Kiprun',
    description: 'Great value running shoes designed by runners',
    price: 3499,
    location: 'Civil Lines, Jaipur, Rajasthan',
    categoryId: runningShoes.id,
    attributes: {
      size: '8',
      color: 'Orange',
      brand: 'Kalenji',
      type: 'Road'
    }
  },
  {
    title: 'Mizuno Wave Rider',
    description: 'Smooth and responsive ride with Wave Plate technology',
    price: 10499,
    location: 'Rajaji Nagar, Bangalore, Karnataka',
    categoryId: runningShoes.id,
    attributes: {
      size: '10',
      color: 'Silver',
      brand: 'Mizuno',
      type: 'Road'
    }
  },
  {
    title: 'Under Armour HOVR Sonic',
    description: 'Connected running shoes with UA MapMyRun integration',
    price: 9990,
    location: 'Koramangala, Bangalore, Karnataka',
    categoryId: runningShoes.id,
    attributes: {
      size: '9',
      color: 'Grey-Blue',
      brand: 'Under Armour',
      type: 'Road'
    }
  },
  {
    title: 'Campus Active Pro',
    description: 'Affordable and stylish shoes for beginner runners',
    price: 2999,
    location: 'Sector 22, Chandigarh, Punjab',
    categoryId: runningShoes.id,
    attributes: {
      size: '9',
      color: 'Black/White',
      brand: 'Campus',
      type: 'Road'
    }
  }
];


  // Insert all listings
  for (const listing of [...tvListings, ...shoeListings]) {
    await prisma.listing.create({ data: listing })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 