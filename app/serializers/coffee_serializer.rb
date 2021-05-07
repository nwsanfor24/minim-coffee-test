class CoffeeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :image_url, :slug

  attribute :avg_score do |object|
    (object.avg_score.to_f / 100).to_f.round(2)
  end
  
  has_many :reviews
end
