module Api
    module V1
        class CoffeesController < ApplicationController
            def index
                coffees = Coffee.all

                render json: CoffeeSerializer.new(coffees).serialized_json
            end

            def show
                coffee = Coffee.find_by(slug: params[:slug])

                render json: CoffeeSerializer.new(coffee).serialized_json
            end

            def create
                coffee = Coffee.new(coffee_params)

                if coffee.save
                    render json: CoffeeSerializer.new(coffee).serialized_json
                else
                    render json: {error: coffee.errors.messages }, status: 422
                end
            end

            def update
                coffee = Coffee.new(coffee_params)

                if coffee.save
                    render json: CoffeeSerializer.new(coffee).serialized_json
                else
                    render json: {error: coffee.errors.messages }, status: 422
                end
            end

            private

            def coffee_params
                params.require(:coffee).permit(:name, :image_url)
            end
        end
    end
end