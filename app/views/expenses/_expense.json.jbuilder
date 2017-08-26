json.extract! expense, :id, :desc, :amount, :expense_type, :created_at, :updated_at
json.url expense_url(expense, format: :json)