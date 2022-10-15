require "securerandom"
require "pathname"

class HtmlToPdfJob < ApplicationJob
  queue_as :default

  def perform(*args)
    dir_path = Rails.root.join("output")
    uuid = SecureRandom.uuid
    file_path = Pathname.new(dir_path).join(uuid)
    system("sleep 10 && touch #{file_path}")
    pdf = Pdf.new
    pdf.file.attach(io: File.open(file_path), filename: uuid)
    pdf.save!
  end
end
