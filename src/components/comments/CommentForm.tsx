import React from 'react';
export const CommentForm: React.FC = () => (

<form 
method="post"
action="https://deal-with-the-devil-comments.herokuapp.com/v2/entry/:skienzmatishun/:deal-with-the-devil/master/comments">
  <input 
  name="options[redirect]" 
  type="hidden" 
  value="https://deal-with-the-devil.com" />
  <input name="options[slug]" type="hidden" value="{{ page.slug }}" />
  <label>
      <input name="fields[name]" 
      type="text" />
      Name</label>
  <label><input name="fields[email]" type="email" />E-mail</label>
  <label><textarea name="fields[message]"></textarea>Message</label>
  <button type="submit">Submit</button>
</form>
)