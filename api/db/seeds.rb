# User.create!(
#     username: "白石",
#     email: "example@gmail.com",
#     birth: Date.parse('1990-10-10'),
#     password: "password"
# )

User.create!(
 username: "白石洋介",
 email: "exampl2e@gmail.com",
 birth: Date.parse('1990-12-10'),
 password: "password"
)

5.times do |n|
    gmap = Gmap.create!(
    title: "test_gmap#{10 + n}",
    comment: "test_comment#{10 + n}",
    latitude: 35 + Random.rand.round(6),
    longitude: 139 + Random.rand.round(6),
    magic_word:'',
    picture: File.open("app/assets/images/photos-#{n+6}.jpg"),
    user_id:1)
end

5.times do |n|
    gmap = Gmap.create!(
    title: "test#{n}",
    comment: "test_comment#{n}",
    latitude: 35 + Random.rand,
    longitude: 139 + Random.rand,
    magic_word:'',
    picture: File.open("app/assets/images/photos-#{n+1}.jpg"),
    user_id:2)
end


   # 5.times do |n|
   #  gmap = Gmap.create!(
   #  title: "test#{n}",
   #  comment: "test_comment#{n}",
   #  latitude: 35 + Random.rand,
   #  longitude: 139 + Random.rand,
   #  user_id:1)
   #  image_url = Faker::Avatar.image(slug: gmap.title, size: '150x150')
   #  gmap.image.attach(io: URI.parse(image_url).open, filename: 'avatar.png')
   # end
