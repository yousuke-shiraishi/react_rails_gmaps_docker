module Api
    module V1
      class GmapsController < ApplicationController
        before_action :authenticate_api_user!, only: %i[destroy create search_private]
        # before_action :set_s3_direct_post, only: [:create]
        require 'digest/md5'
        # include CarrierwaveBase64Uploader


          def index
            @gmaps = Gmap.where(magic_word: "").limit(10).order("created_at DESC")
            render json: @gmaps
          end

          def create

            @gmap = current_api_user.gmaps.build(gmap_params)

            if @gmap.save

              render json: { status: 200 }
            else
              render  status: :unprocessable_entity, json:{ messages: @gmap.errors.full_messages }
            end
          end

          def search_public
            @gmaps = User.includes(:gmaps).where('users.username = ? AND users.birth = ? AND magic_word = ?', params[:username], params[:birth], "").references(:gmaps).map(&:gmaps).flatten.uniq

            render json: @gmaps
          end

          def search_private
              @gmaps = User.includes(:gmaps).where('magic_word = ? AND magic_word != ? AND email = ?', Digest::MD5.hexdigest(params[:magic_word]), "", params[:email]).references(:gmaps).map(&:gmaps).flatten.uniq

              render json: @gmaps
          end


          def destroy
              @gmap = current_api_user.gmaps.find(params[:id])

              @gmap.destroy
              render json: { status: 200, message: "gmapのピンを削除しました", mid: params[:id].to_i }
          end

          def presigned_url
            # S3_BUCKET は config/aws.rb
            presigned_object = S3_BUCKET.presigned_post(
                key: "uploads/gmaps/picture/#{SecureRandom.uuid}/#{params[:filename]}",
                success_action_status: '201',
                acl: 'public-read'
            )
            render json: { url: presigned_object.url, fields: presigned_object.fields }
          end

          private

          def gmap_params
            # params.except(:format).permit(:title, :comment,
            #                             :magic_word, :latitude, :longitude, :picture)
            params.except(:format).permit(:title, :comment,
              :magic_word, :latitude, :longitude, :picture)
          end


      end
    end
  end

