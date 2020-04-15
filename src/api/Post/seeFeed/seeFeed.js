import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const follwing = await prisma.user({id: user.id}).following();
      return prisma.posts({
        where: {
          user: {
            id_in: [...follwing.map(user => user.id), user.id]
          }
        },
        orderBy: "caption_DESC"
      })
    }
  }
}