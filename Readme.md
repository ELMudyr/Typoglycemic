# Typoglycemia Text Scrambler

This is a web app that scrambles the middle letters of words while keeping the first and last letters unchanged, making the text still readable. The app fetches news articles related to Morocco using the [Newscatcher API](https://www.newscatcherapi.com/) and applies the typoglycemia effect to the content.

## Features
- Scrambles text while keeping it readable (Typoglycemia effect).
- Fetches real-world news articles about Morocco.
- Handles punctuation to keep the scrambled text well-formed.
- Dark/Light mode for better readablity.

## API Provider

This app uses the **Newscatcher API** to fetch live news articles about Morocco. You can find more information about the API [here](https://www.newscatcherapi.com/).


### API Setup

1. **Get your API key** from [Newscatcher API](https://www.newscatcherapi.com/):
   - Sign up for a free account and get your API key.

2. **Set the API key**:

   Inside the JavaScript file, add your API key:

   ```javascript
   const API_KEY = 'your-api-key-here';
   ```

   Replace `'your-api-key-here'` with your actual key.



## Example Output

Here’s an example of the scrambled text using the typoglycemia effect:

- **Input**: `The news is focused on Morocco today.`
- **Output**: `The nwes is focesud on Mroocco tdoay.`

## Todo
- Typoglify Text Provided by the user.
## License

This project is licensed under the MIT License.

---
