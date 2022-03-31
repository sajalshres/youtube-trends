import { Paper, Avatar, Grid } from "@mantine/core";
import { Star } from "tabler-icons-react";

const Card = () => {
  return (
    <Paper shadow="xs" p="md">
      <Grid grow>
        <Grid.Col span={2} style={{ border: "1px solid black" }}>
          <Avatar color="blue" size="xl" radius={50}>
            <Star size={64} />
          </Avatar>
        </Grid.Col>
        <Grid.Col span={4} style={{ border: "1px solid black" }}>
          Stats
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default Card;
