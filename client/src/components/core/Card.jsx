import { createStyles, Paper, Avatar, Grid, Stack, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  avatar: {
    border: "5px solid #dee2e6",
    height: "90px",
    width: "90px",
    minWidth: "90px",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const Card = ({ icon, title, count }) => {
  const { classes } = useStyles();

  return (
    <Paper shadow="xs" p="md">
      <Grid grow="true" gutter="xs">
        <Grid.Col
          span={1}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Avatar
            color="blue"
            size="xl"
            radius={50}
            variant="light"
            className={classes.avatar}
          >
            {icon}
          </Avatar>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack spacing={0} align="flex-start" style={{ marginTop: "10px" }}>
            <Text
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="xl"
              className={classes.title}
            >
              {title}
            </Text>
            <Text weight={700} size="xl">
              {count}
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default Card;
