FactoryBot.define do
  factory :user do
    name {"白石"}
    email {"ecample@com"}
    birth {Date.parse('1990-10-10')}
  end
end
