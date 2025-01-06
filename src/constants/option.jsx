export const selectTravelersList=[
    {
        "id": 1,
        "title": "Solo Traveler",
        "desc": "Travel independently and explore on your own.",
        "icon": "🧍",
        "people": 1
      },
      {
        "id": 2,
        "title": "Couple Getaway",
        "desc": "Perfect for romantic trips with your partner.",
        "icon": "❤️",
        "people": 2
      },
      {
        "id": 3,
        "title": "Family Trip",
        "desc": "Enjoy a wonderful vacation with your family.",
        "icon": "👨‍👩‍👧‍👦",
        "people": 4
      },
      {
        "id": 4,
        "title": "Friends Group",
        "desc": "Have a fun adventure with your friends.",
        "icon": "👫",
        "people": 5
      },
      {
        "id": 5,
        "title": "Corporate Retreat",
        "desc": "Plan a professional trip for your team.",
        "icon": "🏢",
        "people": 10
      }
    ]

    export const selectBudgetOption=[
        {
            "id": 1,
            "title": "Budget-Friendly",
            "desc": "Affordable options for travelers on a tight budget.",
            "icon": "💰"
          },
          {
            "id": 2,
            "title": "Standard",
            "desc": "Comfortable and balanced travel options.",
            "icon": "🌟"
          },
          {
            "id": 3,
            "title": "Luxury",
            "desc": "Experience premium and luxurious travel.",
            "icon": "👑"
          },
          {
            "id": 4,
            "title": "Adventure",
            "desc": "Thrilling travel experiences with adventure in mind.",
            "icon": "🏕️"
          },
          {
            "id": 5,
            "title": "Custom",
            "desc": "Personalize your travel according to your needs.",
            "icon": "🛠️"
          }
    ]

    export const AI_PROMPT='Generate Travel plan for Location : {location} for {totalDays} Days for {traveler} with a {budget} budget , Give me a Hotels option list with HotelName , Hotel address ,Price ,hotel image url , geo coordinates , rating ,descriptions and  nearby Restaurants name , Restaurants address ,Price ,Restaurants image url , geo coordinates , rating ,descriptions and suggest itinerary with placeName, Place Details , Place image Url ,Geo Coordinates , ticket Pricing , time  travel each of location for {totalDays} with each day plan with best time to visit and suggest location wise best nearby Restaurants name , Restaurants address ,Price ,Restaurants image url , geo coordinates , rating ,descriptions in JSON format'
