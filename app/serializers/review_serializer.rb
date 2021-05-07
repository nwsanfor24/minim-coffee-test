class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :coffee_id

  attribute :email do |object|
    object&.user&.email
  end
end
