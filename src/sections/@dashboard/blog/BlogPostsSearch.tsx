import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Iconify } from 'components/Common';
import { BlogMock } from '_mock';

const PopperStyle = styled((props) => <Popper open={false} placement="bottom-start" {...props} />)({
  width: '280px !important',
});

export interface BlogPostsSearchProps {
  posts: Array<BlogMock>;
}

export default function BlogPostsSearch({ posts }: BlogPostsSearchProps) {
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={posts}
      getOptionLabel={(post) => post.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search post..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={'eva:search-fill'}
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
