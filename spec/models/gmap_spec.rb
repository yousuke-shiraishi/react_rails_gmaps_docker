require 'rails_helper'
require 'digest/md5'
RSpec.describe Gmap, type: :model do
  include ActionDispatch::TestProcess::FixtureFile
  describe '#create' do
    context 'gmapデータを作成' do
      before do
        # @user = User.new(
        @user = FactoryBot.build(:user,
        name: "白石",
        email: "ecample@com",
        birth: Date.parse('1990-10-10')
    )
      end
      it "has a valid factory" do
        user = @user
        @gmap = user.gmaps.build(title: "test1", comment: "test comment1",magic_word: nil, latitude: 35.099999, longitude: 136.1234, user_id: user.id)
        @gmap.picture = fixture_file_upload('../aiueo.png')
        expect(@gmap).to be_valid
      end


      it "is invalid without a title" do
        gmap = FactoryBot.build(:gmap, title: nil)
        gmap.valid?
        expect(gmap.errors[:title]).to include(I18n.t('errors.messages.blank'))
      end

      it "is invalid without a comment" do
        gmap = FactoryBot.build(:gmap, comment: nil)
        gmap.valid?
        expect(gmap.errors[:comment]).to include(I18n.t('errors.messages.blank'))
      end

      it "is invalid without a latitude" do
        gmap = FactoryBot.build(:gmap, latitude: nil)
        gmap.valid?
        expect(gmap.errors[:latitude]).to include(I18n.t('errors.messages.blank'))
      end

      it "is invalid without a longitude" do
        gmap = FactoryBot.build(:gmap, longitude: nil)
        gmap.valid?
        expect(gmap.errors[:longitude]).to include(I18n.t('errors.messages.blank'))
      end

      it "is valid without a magic_word" do
        gmap = FactoryBot.build(:gmap, magic_word: nil)
        gmap.valid?
        expect(gmap.errors[:magic_word]).not_to include(I18n.t('errors.messages.blank'))
      end

      it "is valid without a picture" do
        gmap = FactoryBot.build(:gmap, picture: nil)
        gmap.valid?
        expect(gmap.errors[:picture]).to include(I18n.t('errors.messages.blank'))
      end

    end

    context 'gmapデータを表示' do
      before do
        # @user = User.new(
        @user = FactoryBot.build(:user,
        name: "白石",
        email: "ecample@com",
        birth: Date.parse('1990-10-10')
    )
        @result_gmap = FactoryBot.build(:gmap,
        title: 'test0', comment: 'test_comment0', 
        magic_word:nil, latitude: 35.582502355625245, 
        longitude:139.86108500502363,user_id: @user.id)
      
        @result_gmap.picture = fixture_file_upload('../aiueo.png')
      end

      it '正しく登録できること title: test0, comment: test_comment0, 
      magic_word:nil, latitude: 35.582502355625245, 
      longitude:139.86108500502363 user_id: 3)' do


        # result_gmap1 = user.gmaps.first
        expect(@result_gmap.title).to eq('test0')
        expect(@result_gmap.comment).to eq('test_comment0')
        expect(@result_gmap.magic_word).to eq(nil)
        expect(@result_gmap.latitude).to eq(35.582502355625245)
        expect(@result_gmap.longitude).to eq(139.86108500502363)
        # expect(result_gmap1.user_id).to eq(1)
      end

      it '文字数制限が効いていること' do
        @result_gmap2 = FactoryBot.build(:gmap,
        title: 'a', comment: 'a', 
        magic_word:nil, latitude: 35.582502355625245, 
        longitude:139.86108500502363,user_id: @user.id)
      # puts "aaaa#{Gmap.validators_on(:title)[0]}"
        @result_gmap2.picture = fixture_file_upload('../aiueo.png')
        @result_gmap2.valid?
        @result_gmap2.title = Faker::Lorem.characters(number:26)
        expect(@result_gmap2.valid?).to eq false;
        @result_gmap2.comment = Faker::Lorem.characters(number:256)
        expect(@result_gmap2.valid?).to eq false;

      end

      it '正しく登録できないこと' do
        # user = @user
        result_gmap3 = FactoryBot.build(:gmap)
        expect(result_gmap3.save).to be_falsey
      end
    end
  end
end

