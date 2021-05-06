class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :coffee_id
end
