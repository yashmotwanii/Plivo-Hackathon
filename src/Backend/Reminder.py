from pymongo import MongoClient
from datetime import datetime
import plivo
import time

# Connect to the MongoDB database
client = MongoClient('mongodb://localhost:27017')  # Replace with your MongoDB connection URL
db = client['event_db']  # Replace with your database name
collection = db['reminders']  # Replace with your collection name

def send_msg(to_number, msg):
    # add 91 before the number
    to_number = '91' + to_number
    from_number = '919123456789'
    auth_id = 'MAOTHIODFMOWUTZMFLZS'
    auth_token = 'MTEzMjI5Y2EtNTkxOS00ZDBjLWE2YjItNTM3MGYy'
    client = plivo.RestClient(auth_id, auth_token)
    response = client.messages.create(
        src=from_number,
        dst=to_number,
        text=msg,
    )
    print(response)
    # prints only the message_uuid
    print(response.message_uuid)


while True:
    # Get the current date and time
    current_date = datetime.now().strftime('%Y-%m-%d')
    current_time = datetime.now().strftime('%H:%M')

    # Find documents in the collection that match the current date and time
    matching_documents = collection.find({
        'date': current_date,
        'time': current_time
    })

    # Print matching documents
    for document in matching_documents:
        print("Found matching entry in the database:")
        print(document)
        send_msg(document['phoneNumber'], document['description'])
         # Delete the matching document from the collection
        collection.delete_one({'_id': document['_id']})
        print("Deleted the entry from the database.")

    # Wait for one minute before the next iteration
    time.sleep(30)

# Close the MongoDB connection (this code will not be reached)
client.close()
