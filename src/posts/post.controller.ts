import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { User } from 'src/entities/user.entity';
import { RequestWithUser } from 'src/auth/auth.interface';
import { UpdatePostDto } from './dtos/update-post.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CommentsService } from 'src/comments/comments.service';

@Controller('post')
// @UseGuards(AuthGuard())
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    console.log(user);
    return this.postService.createPost(
      user,
      createPostDto.title,
      createPostDto.content,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('my-posts')
  @UseGuards(AuthGuard('jwt'))
  getMyPosts(@GetUser() user: User) {
    return this.postService.getMyPosts(user);
  }

  @Get(':id')
  getPostById(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }

  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: RequestWithUser,
  ) {
    const user: User = req.user;
    return this.postService.updatePost(id, updatePostDto, user);
  }

  @Get(':id/comments')
  async findAllComments(
    @Param('id', ParseIntPipe) postId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('take', new DefaultValuePipe(5), ParseIntPipe) take: number,
  ) {
    return this.commentsService.findAllComment(postId, page, take);
  }

  @Post(':id/comments')
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) postId: number,
    @Body('content') content: string,
  ) {
    return this.commentsService.createComment(user.userId, postId, content);
  }
}
